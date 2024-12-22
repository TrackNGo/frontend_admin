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
    const [busType, setBusType] = useState<string>("") // State for bus type filter
    const [searchStart, setSearchStart] = useState<string>("") // State for start location search
    const [searchEnd, setSearchEnd] = useState<string>("") // State for end location search
    const [searchRouteNumber, setSearchRouteNumber] = useState<string>("") // State for route number search
    const [priceSort, setPriceSort] = useState<string>("none") // State for price sorting

    const navigate = useNavigate() // Hook for navigation

    // Fetch all time tables when the component mounts
    useEffect(() => {
        const fetchTimeTables = async () => {
            try {
                const response = await axios.get(summaryApi.timeTable.getAllTimeTables.url) // Update the URL if necessary
                setTimeTables(response.data)
                setLoading(false)
            } catch (error: any) {
                setError("Error fetching time tables.")
                setLoading(false)
            }
        }

        fetchTimeTables()
    }, [])

    // Apply filtering logic
    const filteredTimeTables = timeTables.filter((timeTable) => {
        const matchesBusType = busType ? timeTable.busType?.toLowerCase() === busType.toLowerCase() : true
        const matchesStartLocation = timeTable.startLocation
            .toLowerCase()
            .includes(searchStart.toLowerCase())
        const matchesEndLocation = timeTable.endLocation
            .toLowerCase()
            .includes(searchEnd.toLowerCase())
        const matchesRouteNumber = timeTable.busRouteNumber
            .toLowerCase()
            .includes(searchRouteNumber.toLowerCase())
        return matchesBusType && matchesStartLocation && matchesEndLocation && matchesRouteNumber
    })

    // Sort filtered time tables by price
    const sortedTimeTables = filteredTimeTables.sort((a, b) => {
        if (priceSort === "asc") {
            return a.price - b.price
        } else if (priceSort === "desc") {
            return b.price - a.price
        }
        return 0
    })

    // Render loading or error message
    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    // Render time table data or editing form
    return (
        <div>
            <Headline title={"View Time Table"} />
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-wrap items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-4 mt-4 px-4">
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
                <table className="min-w-full table-auto text-sm text-left">
                    <thead className="bg-zinc-800 text-white">
                        <tr>
                            <th className="py-3 px-4">Start Location</th>
                            <th className="py-3 px-4">End Location</th>
                            <th className="py-3 px-4">Bus Route Number</th>
                            <th className="py-3 px-4">Bus Type</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Start Time</th>
                            <th className="py-3 px-4">End Time</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTimeTables.map((timeTable) => (
                            <tr key={timeTable._id} className="border-t hover:bg-gray-100 transition-all">
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
        </div>
    )
}

export default ViewTimeTable
