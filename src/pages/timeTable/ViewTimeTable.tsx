import axios from "axios"
import { useState, useEffect } from "react"
import Headline from "../../components/headline/Headline"
import TimeTableType from "../../types/timeTable/TimeTableType"
import summaryApi from "../../common/summaryApi"

const ViewTimeTable = () => {
    const [timeTables, setTimeTables] = useState<TimeTableType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

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

    // Render time table data
    return (
        <div>
            <Headline title={"View Time Table"} />

            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                <table className="min-w-full table-auto text-sm text-left">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4">Start Location</th>
                            <th className="py-3 px-4">End Location</th>
                            <th className="py-3 px-4">Bus Route Number</th>
                            <th className="py-3 px-4">Bus Type</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Start Time</th>
                            <th className="py-3 px-4">End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeTables.map((timeTable, key) => (
                            <tr key={key} className="border-t hover:bg-gray-100 transition-all">
                                <td className="py-3 px-4">{timeTable.startLocation}</td>
                                <td className="py-3 px-4">{timeTable.endLocation}</td>
                                <td className="py-3 px-4">{timeTable.busRouteNumber}</td>
                                <td className="py-3 px-4">{timeTable.busType}</td>
                                <td className="py-3 px-4">{timeTable.price}</td>
                                <td className="py-3 px-4">{timeTable.startTime}</td>
                                <td className="py-3 px-4">{timeTable.endTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ViewTimeTable