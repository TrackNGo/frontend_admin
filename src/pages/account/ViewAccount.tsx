import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Headline from "../../components/headline/Headline"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import UserTypes from "../../types/user/UserTypes"
import summaryApi from "../../common/summaryApi"

const ViewAccount = () => {
    const navigate = useNavigate()
    const [accounts, setAccounts] = useState<UserTypes[]>([])
    const [filteredAccounts, setFilteredAccounts] = useState<UserTypes[]>([])
    const [selectedType, setSelectedType] = useState<string>("default")
    const [usernameSearchQuery, setUsernameSearchQuery] = useState<string>("")
    const [nicSearchQuery, setNicSearchQuery] = useState<string>("")
    const [mobileSearchQuery, setMobileSearchQuery] = useState<string>("")
    const [currentPage, setCurrentPage] = useState<number>(1)
    const rowsPerPage = 4 // Number of rows per page

    const fetchAccounts = async () => {
        try {
            const response = await axios.get(summaryApi.account.getAllAccounts.url)
            if (response.data && Array.isArray(response.data.users)) {
                setAccounts(response.data.users)
                setFilteredAccounts(response.data.users)
            } else {
                console.error("Unexpected API response:", response.data)
                setAccounts([])
                setFilteredAccounts([])
            }
        } catch (error) {
            console.error("Error fetching accounts:", error)
            setAccounts([])
            setFilteredAccounts([])
        }
    }

    const handleFilterChange = (type: string) => {
        setSelectedType(type)
        applySearchQuery(accounts, usernameSearchQuery, nicSearchQuery, mobileSearchQuery, type)
    }

    const handleUsernameSearchChange = (query: string) => {
        setUsernameSearchQuery(query)
        applySearchQuery(accounts, query, nicSearchQuery, mobileSearchQuery, selectedType)
    }

    const handleNicSearchChange = (query: string) => {
        setNicSearchQuery(query)
        applySearchQuery(accounts, usernameSearchQuery, query, mobileSearchQuery, selectedType)
    }

    const handleMobileSearchChange = (query: string) => {
        setMobileSearchQuery(query)
        applySearchQuery(accounts, usernameSearchQuery, nicSearchQuery, query, selectedType)
    }

    const applySearchQuery = (
        sourceAccounts: UserTypes[],
        usernameQuery: string,
        nicQuery: string,
        mobileQuery: string,
        type: string
    ) => {
        const filteredByType = type === "default"
            ? sourceAccounts
            : sourceAccounts.filter(account => account.accType.toLowerCase() === type.toLowerCase())

        const filteredByUsername = usernameQuery
            ? filteredByType.filter(account => account.username.toLowerCase().includes(usernameQuery.toLowerCase()))
            : filteredByType

        const filteredByNic = nicQuery
            ? filteredByUsername.filter(account => account.nic.toLowerCase().includes(nicQuery.toLowerCase()))
            : filteredByUsername

        const filteredByMobile = mobileQuery
            ? filteredByNic.filter(account => account.mobile.toLowerCase().includes(mobileQuery.toLowerCase()))
            : filteredByNic

        setFilteredAccounts(filteredByMobile)
    }

    const handleResetFilters = () => {
        setSelectedType("default")
        setUsernameSearchQuery("")
        setNicSearchQuery("")
        setMobileSearchQuery("")
        setFilteredAccounts(accounts) // Reset to the original list
    }

    // Pagination logic
    const totalPages = Math.ceil(filteredAccounts.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const currentAccount = filteredAccounts.slice(startIndex, startIndex + rowsPerPage)

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    useEffect(() => {
        fetchAccounts()
    }, [])

    return (
        <div className="px-2">
            <Headline title="View Account" />

            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4 mb-2">
                    <label className="text-gray-600">Clear Filter:</label>
                    <button
                        onClick={handleResetFilters}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-normal rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-red-200"
                    >
                        Reset
                    </button>

                </div>

                <div className="flex items-center space-x-4 mb-4">
                    <label className="text-gray-600">Search by Username:</label>
                    <input
                        type="text"
                        placeholder="Search by Username"
                        value={usernameSearchQuery}
                        onChange={(e) => handleUsernameSearchChange(e.target.value)}
                        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    />

                    <label className="text-gray-600">Search by NIC:</label>
                    <input
                        type="text"
                        placeholder="Search by NIC"
                        value={nicSearchQuery}
                        onChange={(e) => handleNicSearchChange(e.target.value)}
                        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    />

                    <label className="text-gray-600">Search by Mobile:</label>
                    <input
                        type="text"
                        placeholder="Search by Mobile"
                        value={mobileSearchQuery}
                        onChange={(e) => handleMobileSearchChange(e.target.value)}
                        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    />

                    <label className="text-gray-600">Filter by Type:</label>
                    <select
                        value={selectedType}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all"
                    >
                        <option value="default">All</option>
                        <option value="admin">Admin</option>
                        <option value="general">General</option>
                    </select>
                </div>

                <table className="min-w-full table-auto text-sm text-left">
                    <thead className="bg-zinc-800 text-white">
                        <tr>
                            <th className="py-3 px-4">Username</th>
                            <th className="py-3 px-4">First Name</th>
                            <th className="py-3 px-4">Last Name</th>
                            <th className="py-3 px-4">NIC</th>
                            <th className="py-3 px-4">Mobile</th>
                            <th className="py-3 px-4">Type</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAccount.length > 0 ? (
                            currentAccount.map((account, key) => (
                                <tr key={key} className="border-t hover:bg-gray-100 transition-all">
                                    <td className="py-3 px-4">{account.username}</td>
                                    <td className="py-3 px-4">{account.firstName}</td>
                                    <td className="py-3 px-4">{account.lastName}</td>
                                    <td className="py-3 px-4">{account.nic}</td>
                                    <td className="py-3 px-4">{account.mobile}</td>
                                    <td className="py-3 px-4">{account.accType}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => navigate(`/account/view/${account.username}`)}
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
                {/* Displaying the number of results */}
                <div className="mt-4 text-sm text-gray-600 capitalize">
                    Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredAccounts.length)} of {filteredAccounts.length} <b className='capitalize'>accounts</b>
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

export default ViewAccount
