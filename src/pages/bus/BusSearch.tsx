import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import summaryApi from "../../common/summaryApi"

const BusSearch = () => {
    const [searchBusNumber, setSearchBusNumber] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [allBuses, setAllBuses] = useState([]);
    const [filteredBus, setFilteredBus] = useState([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    const navigate = useNavigate()

    async function getAllBus() {
        const response = await axios({
            method: summaryApi.bus.getAllBuses.method,
            url: summaryApi.bus.getAllBuses.url
        })
        if (response) {
            setAllBuses(response.data);
        }
    }

    useEffect(() => {
        getAllBus();
    })


    async function getAllBusByFiltering(userInput: any) {

        if (userInput) {
            const respose = allBuses.filter((bus: any) => bus.busNumber.includes(userInput))
            if (respose) {
                setFilteredBus(respose);
                setShowDropdown(true);
            }
            else {
                setShowDropdown(false);
            }
        }
    }

    async function suggessionOnClick(userSelectBusNumber: any) {
        if (userSelectBusNumber) {
            handleSearchClick(userSelectBusNumber)
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBusNumber(e.target.value)
        if (e.target.value) {
            getAllBusByFiltering(e.target.value)
        }
        else {
            setShowDropdown(false);
            setAllBuses([]);
        }
    }

    const handleSearchClick = (searchBusNumber: any) => {
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
        <div className="flex justify-center pt-10">
            <div className="p-5 bg-white">
                <div className="flex items-center space-x-3 relative">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter bus number"
                            value={searchBusNumber}
                            onChange={handleSearchChange}
                            className="p-3 w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                        {showDropdown && filteredBus.length > 0 && (
                            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-auto z-10">
                                {filteredBus.map((bus: any, index: any) => (
                                    <li
                                        key={index}
                                        onClick={() => suggessionOnClick(bus.busNumber)}
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {bus.busNumber}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button
                        onClick={() => handleSearchClick(searchBusNumber)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Search
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-md transition duration-200"
                    >
                        Back
                    </button>
                </div>
                {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
            </div>
        </div>
    )
}

export default BusSearch
