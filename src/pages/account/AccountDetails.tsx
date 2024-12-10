import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import summaryApi from "../../common/summaryApi"
import ErrorMessage from "../../components/errorMessage/ErrorMessage"
import UserTypes from "../../types/user/UserTypes"
import UserDetailsTable from "../../components/userDetailsTable/UserDetailsTable"
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner"

const AccountDetails = () => {
    const { username } = useParams<{ username: any }>()
    const [userDetails, setUserDetails] = useState<UserTypes | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [originalUserDetails, setOriginalUserDetails] = useState<UserTypes | null>(null)

    const navigate = useNavigate()

    const fetchUserDetails = async () => {
        try {
            const response = await axios({
                method: summaryApi.account.getAccountByUsername.method,
                url: summaryApi.account.getAccountByUsername.url.replace(':username', username)
            })
            if (response.data) {
                setUserDetails(response.data.user)
                setOriginalUserDetails(response.data.user)
                console.log(userDetails)
                setError('')
            } else {
                setError('No user found with that username')
            }
        } catch (error) {
            setError('Failed to fetch user details')
        } finally {
            setLoading(false)
        }
    }

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setUserDetails({ ...originalUserDetails! })
    }

    const handleReset = () => {
        toast.warning('User reset successfully!')
        setUserDetails({ ...originalUserDetails! })
    }

    const handleSaveChanges = async () => {
        if (userDetails) {
            try {
                const response = await axios.put(summaryApi.account.updateAccount.url.replace(':username', username), userDetails)
                setUserDetails(response.data)
                setOriginalUserDetails(response.data)
                setIsEditing(false)
                toast.success('User updated successfully!')
            } catch (error) {
                setError('Failed to save user details')
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (userDetails) {
            setUserDetails({
                ...userDetails,
                [e.target.name]: e.target.value,
            })
        }
    }

    const isSaveEnabled = (): boolean => {
        if (!userDetails || !originalUserDetails) return false
        return JSON.stringify(userDetails) !== JSON.stringify(originalUserDetails)
    }

    const handleDelete = async () => {
        if (userDetails) {
            const confirmDelete = window.confirm('Are you sure you want to delete this user?')
            if (confirmDelete) {
                try {
                    await axios.delete(summaryApi.account.deleteAccount.url.replace(':username', username))
                    navigate('/users') // Navigate to the user list page after deletion
                    toast.success('User deleted successfully!')
                } catch (error) {
                    setError('Failed to delete user')
                }
            }
        }
    }

    useEffect(() => {
        if (username) {
            fetchUserDetails()
        }
    }, [username,isEditing])

    if (loading) return <LoadingSpinner />

    return (
        <div className="container mx-auto p-5">

            {error && <ErrorMessage message={error} />}

            <div className="flex justify-between items-center mt-2 mb-3">
                <h2 className="text-2xl font-semibold">Account Details</h2>
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
                            disabled={!userDetails}
                            className={`${!userDetails ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
                                } text-white px-4 mt-5 py-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500`}
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={!userDetails}
                            className="bg-red-600 text-white px-4 mt-5 py-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {userDetails ? (
                <UserDetailsTable
                    userDetails={userDetails}
                    isEditing={isEditing}
                    handleChange={handleChange}
                />
            ) : (
                <div className="text-center text-red-500 mt-5">No user details to display</div>
            )}

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    )
}

export default AccountDetails
