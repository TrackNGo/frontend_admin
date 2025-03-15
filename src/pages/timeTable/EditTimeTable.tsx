import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import summaryApi from "../../common/summaryApi"
import TimeTableType from "../../types/timeTable/TimeTableType"
import SelectBox from "../../components/selectBox/SelectBox"
import TextBox from "../../components/textBox/TextBox"

const EditTimeTable = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [timeTable, setTimeTable] = useState<TimeTableType | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // Form data state
    const [formData, setFormData] = useState<TimeTableType>({
        startLocation: '',
        endLocation: '',
        busRouteNumber: '',
        busType: '',
        price: 0,
        startTime: '',
        endTime: ''
    })

    const formClear=()=>{
        setFormData({
            startLocation: '',
            endLocation: '',
            busRouteNumber: '',
            busType: '',
            price: 0,
            startTime: '',
            endTime: ''
        })
    }

    useEffect(() => {
        const fetchTimeTable = async () => {
            try {
                const response = await axios({
                    method: summaryApi.timeTable.getTimeTableById.method,
                    url: summaryApi.timeTable.getTimeTableById.url.replace(':id', id || '')
                })
                setTimeTable(response.data)
                setFormData(response.data)  // Set the form data to the fetched timetable
                setLoading(false)
            } catch (error) {
                setError("Error fetching time table details.")
                setLoading(false)
            }
        }
        fetchTimeTable()
    }, [id])

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            busType: value,
        }))
    }

    // Handle update time table
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();  // Prevent the default form submission behavior

        try {
            // Send PUT request to update the time table
            await axios({
                method: summaryApi.timeTable.updateTimeTable.method,
                url: summaryApi.timeTable.updateTimeTable.url.replace(':id', id || ''),
                data: formData
            })
            toast.success('Time Table Updated Successfully!')
            navigate("/timetable/view")  // Navigate back to the time table list page after updating
        } catch (error) {
            setError("Error updating time table.")
            toast.warning('Time Table Update Problem!')
        }
        formClear()
    }

    // Handle delete time table
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this time table?')

        if (confirmDelete) {
            try {
                await axios({
                    method: summaryApi.timeTable.deleteTimeTable.method,
                    url: summaryApi.timeTable.deleteTimeTable.url.replace(':id', id || '')
                })
                toast.success('Time Table Deleted Successfully!')
                navigate("/timetable/view")  // Navigate back to the time table list page after deletion
            } catch (error) {
                setError("Error deleting time table.")
                toast.warning('Time Table Delete Problem!')
            }
            formClear()
        }
    }

    // Render loading or error message
    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="px-2">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Time Table</h1>

            <div className="mb-4">{timeTable && (
                <form className="bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto">
                    <div className="my-1">
                        <TextBox
                            title={"Start Location"}
                            type={"text"}
                            placeholder={"Enter Start Location"}
                            name={"startLocation"}
                            value={formData.startLocation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-1 mt-2">
                        <TextBox
                            title={"End Location"}
                            type={"text"}
                            placeholder={"Enter End Location"}
                            name={"endLocation"}
                            value={formData.endLocation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-1 mt-2">
                        <TextBox
                            title={"Route Number"}
                            type={"text"}
                            placeholder={"Enter Route Number"}
                            name={"busRouteNumber"}
                            value={formData.busRouteNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-1 mt-2">
                        <SelectBox
                            title="Bus Type"
                            name="busType"
                            options={["Normal", "Semi-Luxury", "Luxury"]}
                            value={formData.busType}
                            placeholder="Select Bus Type"
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div className="my-1 mt-2">
                        <TextBox
                            title={"Ticket Price"}
                            type={"number"}
                            placeholder={"Enter Ticket Price"}
                            name={"price"}
                            value={formData.price.toString()}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-1 mt-2">
                        <TextBox
                            title={"Start Time"}
                            type={"time"}
                            name={"startTime"}
                            value={formData.startTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="my-1 mt-2">
                        <TextBox
                            title={"End Time"}
                            type={"time"}
                            name={"endTime"}
                            value={formData.endTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            )}
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    )
}

export default EditTimeTable
