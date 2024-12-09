import { useEffect, useState } from 'react'
import axios from 'axios'
import BusDetailsType from '../../types/busDetails/BusDetailsTypes'
import summaryApi from '../../common/summaryApi'
import { Link } from 'react-router-dom'

const ViewBuses = () => {
  const [buses, setBuses] = useState<BusDetailsType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [busType, setBusType] = useState<string>('') // State for bus type filter
  const [busStatus, setBusStatus] = useState<string>('') // State for bus status filter
  const [searchBusNumber, setSearchBusNumber] = useState<string>('') // Search input for bus number
  const [searchRouteNumber, setSearchRouteNumber] = useState<string>('') // Search input for route number
  const [searchStartLocation, setSearchStartLocation] = useState<string>('') // Search input for start location
  const [searchEndLocation, setSearchEndLocation] = useState<string>('') // Search input for end location
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default') // State for fare estimate sort
  const rowsPerPage = 4 // Number of rows to display per page

  useEffect(() => {
    // Fetch the buses data using axios from summaryApi
    const fetchBuses = async () => {
      try {
        const response = await axios({
          method: summaryApi.bus.getAllBuses.method,
          url: summaryApi.bus.getAllBuses.url
        })
        setBuses(response.data)
      } catch (error) {
        setError('Failed to fetch buses')
      } finally {
        setLoading(false)
      }
    }

    fetchBuses()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    )
  }

  // Filter buses by type, status, bus number, route number, start location, and end location
  const filteredBuses = buses.filter(bus => {
    const isTypeMatch = busType ? bus.type?.toLowerCase() === busType.toLowerCase() : true
    const isStatusMatch = busStatus ? (bus.status ? 'active' : 'inactive') === busStatus.toLowerCase() : true
    const isBusNumberMatch = searchBusNumber ? bus.busNumber.toLowerCase().includes(searchBusNumber.toLowerCase()) : true
    const isRouteNumberMatch = searchRouteNumber ? bus.routeNumber.toLowerCase().includes(searchRouteNumber.toLowerCase()) : true
    const isStartLocationMatch = searchStartLocation ? bus.startLocation.toLowerCase().includes(searchStartLocation.toLowerCase()) : true
    const isEndLocationMatch = searchEndLocation ? bus.endLocation.toLowerCase().includes(searchEndLocation.toLowerCase()) : true
    return isTypeMatch && isStatusMatch && isBusNumberMatch && isRouteNumberMatch && isStartLocationMatch && isEndLocationMatch
  })

  // Sorting by Fare Estimate (ascending, descending, default)
  const sortedBuses = filteredBuses.sort((a: BusDetailsType, b: BusDetailsType) => {
    const fareA = parseFloat(a.fareEstimate) // Convert string to number
    const fareB = parseFloat(b.fareEstimate) // Convert string to number

    if (sortOrder === 'asc') {
      return fareA - fareB
    } else if (sortOrder === 'desc') {
      return fareB - fareA
    }
    return 0 // Default (no sorting)
  })

  // Pagination logic
  const totalPages = Math.ceil(sortedBuses.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const currentBuses = sortedBuses.slice(startIndex, startIndex + rowsPerPage)

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-semibold text-gray-800">All Buses</h1>

      {/* Filter and Search Options */}
      <div className="flex items-center space-x-4 mb-4">
        <label className="text-gray-600">Filter by Type:</label>
        <select
          value={busType}
          onChange={(e) => setBusType(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">All</option>
          <option value="luxury">Luxury</option>
          <option value="normal">Normal</option>
          <option value="semi-luxury">Semi-Luxury</option>
        </select>

        <label className="text-gray-600">Filter by Status:</label>
        <select
          value={busStatus}
          onChange={(e) => setBusStatus(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Sort by Fare Estimate */}
        <label className="text-gray-600">Sort by Fare Estimate:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'default' | 'asc' | 'desc')}
          className="p-2 border rounded-lg"
        >
          <option value="default">Default</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Search by Bus Number, Route Number, Start and End Locations */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by Start Location"
          value={searchStartLocation}
          onChange={(e) => setSearchStartLocation(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Search by End Location"
          value={searchEndLocation}
          onChange={(e) => setSearchEndLocation(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Search by Bus Number"
          value={searchBusNumber}
          onChange={(e) => setSearchBusNumber(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Search by Route Number"
          value={searchRouteNumber}
          onChange={(e) => setSearchRouteNumber(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Table for listing buses */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Bus Number</th>
              <th className="py-3 px-4 text-left">Start Location</th>
              <th className="py-3 px-4 text-left">End Location</th>
              <th className="py-3 px-4 text-left">Route Number</th>
              <th className="py-3 px-4 text-left">Fare Estimate(Rs.)</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBuses && currentBuses.map((bus, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 capitalize">
                <td className="py-3 px-4 uppercase">{bus.busNumber}</td>
                <td className="py-3 px-4">{bus.startLocation}</td>
                <td className="py-3 px-4">{bus.endLocation}</td>
                <td className="py-3 px-4">{bus.routeNumber}</td>
                <td className="py-3 px-4">{bus.fareEstimate}</td>
                <td className="py-3 px-4">
                  {/* Status Indicator with Ping Animation */}
                  {bus.status ? (
                    <div className="relative flex items-center">
                      <span className="absolute flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                      </span>
                      <span className="ml-5 text-green-600">Active</span>
                    </div>
                  ) : (
                    <div className="relative flex items-center">
                      <span className="absolute flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      <span className="ml-5 text-red-600">Inactive</span>
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">{bus.type}</td>
                <td className="py-3 px-4">
                  {/* View Button */}
                  <Link
                    to={`/bus/view/${bus.busNumber}`}
                    className="inline-block py-2 px-4 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Displaying the number of results */}
      <div className="mt-4 text-sm text-gray-600 capitalize">
        Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredBuses.length)} of {filteredBuses.length} <b className='capitalize'>buses</b>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        <div className="flex space-x-2">
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ViewBuses
