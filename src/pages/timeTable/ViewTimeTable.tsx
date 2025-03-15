import axios from "axios"
import { useState, useEffect } from "react"
import Headline from "../../components/headline/Headline"
import TimeTableType from "../../types/timeTable/TimeTableType"
import summaryApi from "../../common/summaryApi"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"

const ViewTimeTable = () => {
    const [timeTables, setTimeTables] = useState<TimeTableType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [busType, setBusType] = useState<string>("")
    const [searchStart, setSearchStart] = useState<string>("")
    const [searchEnd, setSearchEnd] = useState<string>("")
    const [searchRouteNumber, setSearchRouteNumber] = useState<string>("")
    const [priceSort, setPriceSort] = useState<string>("none")
    const [currentPage, setCurrentPage] = useState<number>(1) // Current page state
    const rowsPerPage = 4 // Number of rows to display per page

    const navigate = useNavigate()

    useEffect(() => {
        const fetchTimeTables = async () => {
            try {
                const response = await axios.get(summaryApi.timeTable.getAllTimeTables.url)
                setTimeTables(response.data)
                setLoading(false)
            } catch (error: any) {
                setError("Error fetching time tables.")
                setLoading(false)
            }
        }

        fetchTimeTables()
    }, [])

    const filteredTimeTables = timeTables.filter((timeTable) => {
        const matchesBusType = busType ? timeTable.busType?.toLowerCase() === busType.toLowerCase() : true
        const matchesStartLocation = timeTable.startLocation.toLowerCase().includes(searchStart.toLowerCase())
        const matchesEndLocation = timeTable.endLocation.toLowerCase().includes(searchEnd.toLowerCase())
        const matchesRouteNumber = timeTable.busRouteNumber.toLowerCase().includes(searchRouteNumber.toLowerCase())
        return matchesBusType && matchesStartLocation && matchesEndLocation && matchesRouteNumber
    })

    const sortedTimeTables = filteredTimeTables.sort((a, b) => {
        if (priceSort === "asc") {
            return a.price - b.price
        } else if (priceSort === "desc") {
            return b.price - a.price
        }
        return 0
    })

    // Pagination calculations
    const totalPages = Math.ceil(sortedTimeTables.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const currentTimeTables = sortedTimeTables.slice(startIndex, startIndex + rowsPerPage)

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const handleResetFilters = () => {
        setBusType("") // Reset busType to an empty string
        setSearchStart("") // Reset searchStart
        setSearchEnd("") // Reset searchEnd
        setSearchRouteNumber("") // Reset searchRouteNumber
        setPriceSort("none") // Reset priceSort to its default state
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <Headline title={"View Time Table"} />
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap items-center space-x-4 mb-4 pl-0">
                    <div className="flex items-center space-x-4 mt-4 px-4">
                        <label className="text-gray-600">Clear Filter:</label>
                        <button
                            onClick={handleResetFilters}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-normal rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-red-200"
                        >
                            Reset
                        </button>
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
                        <label className="text-gray-600">Sort by Price:</label>
                        <select
                            value={priceSort}
                            onChange={(e) => setPriceSort(e.target.value)}
                            className="p-2 border rounded-lg"
                        >
                            <option value="none">Default</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div className="space-x-1 mt-3">
                        <label className="text-gray-600">Search by Start Location:</label>
                        <input
                            type="text"
                            value={searchStart}
                            onChange={(e) => setSearchStart(e.target.value)}
                            placeholder="Enter Start Location"
                            className="p-2 border rounded-lg"
                        />
                        <label className="text-gray-600">Search by End Location:</label>
                        <input
                            type="text"
                            value={searchEnd}
                            onChange={(e) => setSearchEnd(e.target.value)}
                            placeholder="Enter End Location"
                            className="p-2 border rounded-lg"
                        />
                        <label className="text-gray-600">Search by Route Number:</label>
                        <input
                            type="text"
                            value={searchRouteNumber}
                            onChange={(e) => setSearchRouteNumber(e.target.value)}
                            placeholder="Enter Route Number"
                            className="p-2 border rounded-lg"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto items-center bg-white shadow-lg rounded-lg">
                    <table className="min-w-full text-sm text-gray-800">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left">Start Location</th>
                                <th className="py-3 px-4 text-left">End Location</th>
                                <th className="py-3 px-4 text-left">Bus Route Number</th>
                                <th className="py-3 px-4 text-left">Bus Type</th>
                                <th className="py-3 px-4 text-left">Max Price</th>
                                <th className="py-3 px-4 text-left">Start Time</th>
                                <th className="py-3 px-4 text-left">End Time</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTimeTables.map((timeTable, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50 capitalize">
                                    <td className="py-3 px-4">{timeTable.startLocation}</td>
                                    <td className="py-3 px-4">{timeTable.endLocation}</td>
                                    <td className="py-3 px-4">{timeTable.busRouteNumber}</td>
                                    <td className="py-3 px-4">{timeTable.busType}</td>
                                    <td className="py-3 px-4">{timeTable.price}</td>
                                    <td className="py-3 px-4">{timeTable.startTime}</td>
                                    <td className="py-3 px-4">{timeTable.endTime}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => {
                                                navigate(`/timetable/view/${timeTable._id}`)
                                            }}
                                            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md border-2 border-transparent hover:border-yellow-600 hover:ring-2 hover:ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Displaying the number of results */}
                <div className="mt-4 text-sm text-gray-600 capitalize">
                    Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredTimeTables.length)} of {filteredTimeTables.length} <b className='capitalize'>time tables</b>
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
        </div>
    )
}

export default ViewTimeTable
