import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import summaryApi from "../../common/summaryApi"

const BusSearch = () => {
    const [searchBusNumber, setSearchBusNumber] = useState<string>('') 
    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBusNumber(e.target.value)
    }

    const handleSearchClick = () => {
        if (searchBusNumber) {
            const fetchBusDetailsBySearch = async () => {
                try {
                    const response = await axios({
                        method: summaryApi.bus.getBusByBusNumber.method,
                        url: summaryApi.bus.getBusByBusNumber.url.replace(':busNumber', searchBusNumber)
                    })
                    if (response.status == 200) {
                        navigate(`/bus/view/${searchBusNumber}`)
                    } else {
                        setError('Failed to fetch bus details')
                    }
                } catch (error) {
                    setError('No bus found with that number')
                }
            }
            fetchBusDetailsBySearch()
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
            {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        </div>
    )
}

export default BusSearch
