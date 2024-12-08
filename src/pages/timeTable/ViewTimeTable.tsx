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

    const navigate = useNavigate() // Hook for navigation

    // Fetch all time tables when the component mounts
    useEffect(() => {
        const fetchTimeTables = async () => {
            try {
                const response = await axios.get(summaryApi.timeTable.getAllTimeTables.url)  // Update the URL if necessary
                setTimeTables(response.data)
                setLoading(false)
            } catch (error: any) {
                setError("Error fetching time tables.")
                setLoading(false)
            }
        }

        fetchTimeTables()
    }, [])

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
                        {timeTables.map((timeTable) => (
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
                                        onClick={() => { navigate(`/timetable/view/${timeTable._id}`) }} // Route to "Edit Time Table" page
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
