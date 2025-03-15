import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Headline from "../../components/headline/Headline"
import FareDetailsType from "../../types/fareDetails/FareDetailsType"
import { useNavigate } from "react-router-dom"
import summaryApi from "../../common/summaryApi"
import axios from "axios"

const ViewFareEstimate = () => {
    const navigate = useNavigate()
    const [fare, setFare] = useState<FareDetailsType[]>([])
    const [filteredFare, setFilteredFare] = useState<FareDetailsType[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const rowsPerPage = 4 // Number of rows per page

    const fetchFare = async () => {
        try {
            const response = await axios.get(summaryApi.account.getAllAccounts.url)
            if (response.data && Array.isArray(response.data.users)) {
                setFare(response.data.users)
                setFilteredFare(response.data.users)
            } else {
                console.error("Unexpected API response:", response.data)
                setFare([])
                setFilteredFare([])
            }
        } catch (error) {
            console.error("Error fetching accounts:", error)
            setFare([])
            setFilteredFare([])
        }
    }

    // Pagination logic
    const totalPages = Math.ceil(filteredFare.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const currentFare = filteredFare.slice(startIndex, startIndex + rowsPerPage)

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return (
        <div className='px-2'>
            <Headline title="View Fare Estimate" />

            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                    <label className="text-gray-600">Clear Filter:</label>
                    <button
                        onClick={() => { }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-normal rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-red-200"
                    >
                        Reset
                    </button>

                    <label className="text-gray-600">Search by Bus Number:</label>
                    <input
                        type="text"
                        placeholder="Search by Bus Number"
                        value={""}
                        onChange={() => { }}
                        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    />

                    <label className="text-gray-600">Search by Route Number:</label>
                    <input
                        type="text"
                        placeholder="Search by Route Number"
                        value={""}
                        onChange={() => { }}
                        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    />

                </div>

                <div className="flex items-center space-x-4 mb-4">
                    <label className="text-gray-600">Search by Start Location:</label>
                    <input
                        type="text"
                        placeholder="Search by Start Location"
                        value={""}
                        onChange={() => { }}
                        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    />

                    <label className="text-gray-600">Search by End Location:</label>
                    <input
                        type="text"
                        placeholder="Search by End Location"
                        value={""}
                        onChange={() => { }}
                        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    />

                    <label className="text-gray-600">Filter by Type:</label>
                    <select
                        value={""}
                        onChange={() => { }}
                        className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all"
                    >
                        <option value="default">All</option>
                        <option value="normal">Normal</option>
                        <option value="semi-luxury">Semi-Luxury</option>
                        <option value="luxury">Luxury</option>
                    </select>
                </div>

                <div className="overflow-x-auto items-center bg-white shadow-lg rounded-lg">
                    <table className="min-w-full text-sm text-gray-800">
                        <thead className="bg-gray-200 text-left">
                            <tr>
                                <th className="py-3 px-4">Bus No</th>
                                <th className="py-3 px-4">Bus Route</th>
                                <th className="py-3 px-4">Bus Type</th>
                                <th className="py-3 px-4">Start Location</th>
                                <th className="py-3 px-4">End Location</th>
                                <th className="py-3 px-4">Estimated Fare</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFare.length > 0 ? (
                                currentFare.map((est, key) => (
                                    <tr key={key} className="border-t hover:bg-gray-100 transition-all">
                                        <td className="py-3 px-4">{est.busNumber}</td>
                                        <td className="py-3 px-4">{est.routeNumber}</td>
                                        <td className="py-3 px-4">{est.type}</td>
                                        <td className="py-3 px-4">{est.startLocation}</td>
                                        <td className="py-3 px-4">{est.endLocation}</td>
                                        <td className="py-3 px-4">{est.price}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => navigate(`/account/view/${est.busNumber}`)}
                                                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md border-2 border-transparent hover:border-yellow-600 hover:ring-2 hover:ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
                                            >
                                                <FontAwesomeIcon icon={faEdit} className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-3 px-4 text-center">
                                        No accounts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Displaying the number of results */}
                <div className="mt-4 text-sm text-gray-600 capitalize">
                    Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredFare.length)} of {filteredFare.length} <b className='capitalize'>fares</b>
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

export default ViewFareEstimate
