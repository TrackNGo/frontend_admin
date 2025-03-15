import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import summaryApi from "../../common/summaryApi"
import BusDetailsTable from "../../components/busDetailTable/BusDetailsTable"
import ErrorMessage from "../../components/errorMessage/ErrorMessage"
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner"
import BusDetailsType from "../../types/busDetails/BusDetailsTypes"

const BusDetail = () => {
    const { busNumber } = useParams<{ busNumber: any }>()
    const [busDetails, setBusDetails] = useState<BusDetailsType | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [searchBusNumber, setSearchBusNumber] = useState<string>('')

    const [originalBusDetails, setOriginalBusDetails] = useState<BusDetailsType | null>(null) // New state to store original bus details

    const navigate = useNavigate()

    const fetchBusDetails = async () => {
        try {
            const response = await axios({
                method: summaryApi.bus.getBusByBusNumber.method,
                url: summaryApi.bus.getBusByBusNumber.url.replace(':busNumber', busNumber)
            })
            if (response.data) {
                setBusDetails(response.data)
                setOriginalBusDetails(response.data) // Store the original bus details
                setError('') // Clear error if data is fetched
            } else {
                setError('No bus found with that number')
            }
        } catch (error) {
            setError('Failed to fetch bus details')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (busNumber) {

            fetchBusDetails()
        }
    }, [busNumber])

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setBusDetails({ ...originalBusDetails! }) // Restore the original bus details
    }

    const handleReset = () => {
        toast.warning('Bus reset successfully!')
        // Reset the form fields to original bus details
        setBusDetails({ ...originalBusDetails! })
    }

    const handleSaveChanges = async () => {
        if (busDetails) {
            try {
                const response = await axios({
                    method: 'PUT',
                    url: summaryApi.bus.getBusByBusNumber.url.replace(':busNumber', busNumber),
                    data: busDetails,
                })
                // Update the busDetails state with the response data
                setBusDetails(response.data)
                setOriginalBusDetails(response.data) // Update original bus details after saving
                setIsEditing(false) // Exit editing mode
                toast.success('Bus updated successfully!')
            } catch (error) {
                setError('Failed to save bus details')
            }
            fetchBusDetails()
        }
    }

    const fetchBusDetailsBySearch = async () => {
        try {
            const response = await axios({
                method: summaryApi.bus.getBusByBusNumber.method,
                url: summaryApi.bus.getBusByBusNumber.url.replace(':busNumber', searchBusNumber.trim().toLowerCase()) // Ensure lowercased search input
            })

            if (response.status === 200 && response.data) {
                setBusDetails(response.data)
                setError('') // Clear any existing errors
                window.location.reload()
                navigate(`/bus/view/${searchBusNumber.trim().toLowerCase()}`) // Navigate to the search result page
            } else {
                setBusDetails(null)
                setError('No bus found with that bus number')
            }
        } catch (error) {
            setBusDetails(null)
            setError('Failed to fetch bus details')
        }
    }

    const handleSearchClick = () => {
        if (searchBusNumber) {
            fetchBusDetailsBySearch()
        } else {
            setError('Please enter a bus number to search')
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBusNumber(e.target.value)
    }

    const handleChange = (e: any) => {
        if (busDetails) {
            setBusDetails({
                ...busDetails,
                [e.target.name]: e.target.value,
            })
        }
    }

    // Function to check if any changes have been made
    const isSaveEnabled = (): boolean => {
        if (!busDetails || !originalBusDetails) return false

        // Compare fields of busDetails with originalBusDetails
        return JSON.stringify(busDetails) !== JSON.stringify(originalBusDetails)
    }

    if (loading) return <LoadingSpinner />

    // Function to handle deleting the bus
    const handleDelete = async () => {
        if (busDetails) {
            const confirmDelete = window.confirm('Are you sure you want to delete this bus?')
            if (confirmDelete) {
                try {
                    await axios({
                        method: 'DELETE',
                        url: summaryApi.bus.deleteBusByBusNumber.url.replace(':busNumber', busNumber),
                    })
                    navigate('/bus/buses') // Navigate to the bus list page after deletion
                    toast.done('Bus delete successfully!')
                } catch (error) {
                    setError('Failed to delete bus details')
                }
            }
        }
    }

    return (
        <div className="container mx-auto p-5">
            <div className="flex items-center justify-center space-x-3">
                <input
                    type="text"
                    placeholder="Enter bus number"
                    value={searchBusNumber}
                    onChange={handleSearchChange}
                    className="p-3 w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                <button
                    onClick={handleSearchClick}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>

            {error && <ErrorMessage message={error} />}

            <div className="flex justify-between items-center mt-2 mb-3">
                <h2 className="text-2xl font-semibold">Bus Details</h2>
                {isEditing ? (
                    <div className="flex justify-end mt-5 space-x-2">
                        <button
                            onClick={handleSaveChanges}
                            disabled={!isSaveEnabled()} // Disable Save button if no changes were made
                            className={`${!isSaveEnabled()
                                ? 'bg-gray-400 cursor-not-allowed' // Disabled color and cursor
                                : 'bg-green-600 hover:bg-green-700'
                                } text-white px-4 py-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500`}
                        >
                            Save Changes
                        </button>

                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleReset}
                            className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:bg-orange-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Reset
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={handleEditClick}
                            disabled={!busDetails}
                            className={`${!busDetails ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
                                } text-white px-4 mt-5 py-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500`}
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={!busDetails}
                            className="bg-red-600 text-white px-4 mt-5 py-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Delete
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 mt-5 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md transition duration-200"
                        >
                            Back
                        </button>
                    </div>
                )}
            </div>

            {/* Conditionally render the table if bus details exist */}
            {busDetails ? (
                <BusDetailsTable
                    busDetails={busDetails}
                    isEditing={isEditing}
                    handleChange={handleChange}
                />
            ) : (
                <div className="text-center text-red-500 mt-5">No bus details to display</div>
            )}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    )
}

export default BusDetail
