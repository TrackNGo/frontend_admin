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
    const [accounts, setAccounts] = useState<UserTypes[]>([]) // Initialize with an empty array

    const fetchAccounts = async () => {
        try {
            const response = await axios.get(summaryApi.account.getAllAccounts.url)
    
            // Extract the 'users' array from the response if it exists
            if (response.data && Array.isArray(response.data.users)) {
                setAccounts(response.data.users)
            } else {
                console.error("Unexpected API response:", response.data)
                setAccounts([]) // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching accounts:", error)
            setAccounts([]) // Fallback to an empty array on error
        }
    }    

    useEffect(() => {
        fetchAccounts()
    }, [])

    return (
        <div className="px-2">
            <Headline title="View Account" />

            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
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
                        {accounts.length > 0 ? (
                            accounts.map((account, key) => (
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
            </div>
        </div>
    )
}

export default ViewAccount
