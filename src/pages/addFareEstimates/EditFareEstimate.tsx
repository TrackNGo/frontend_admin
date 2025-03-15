import { useNavigate, useParams } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import SelectBox from "../../components/selectBox/SelectBox"
import TextBox from "../../components/textBox/TextBox"
import { useEffect, useState } from "react"
import FareDetailsType from "../../types/fareDetails/FareDetailsType"
import axios from "axios"
import summaryApi from "../../common/summaryApi"

const EditFareEstimate = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [formData, setFormData] = useState<FareDetailsType>({
        busType: "",
        estimatedFare: "",
        startStop: "",
        endStop: "",
        routeNumber: ""
    })

    const [fare, setFare] = useState<FareDetailsType | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const formClear = () => {
        setFormData({
            busType: "",
            estimatedFare: "",
            startStop: "",
            endStop: "",
            routeNumber: ""
        })
    }

    useEffect(() => {
        const fetchTimeTable = async () => {
            try {
                const response = await axios({
                    method: summaryApi.fareEstimate.getFareEstimateById.method,
                    url: summaryApi.fareEstimate.getFareEstimateById.url.replace(':id', id || '')
                })
                setFare(response.data)
                setFormData(response.data)
                setLoading(false)
            } catch (error) {
                setError("Error fetching fareestimate details.")
                setLoading(false)
            }
        }
        fetchTimeTable()
    }, [id])

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

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios({
                method: summaryApi.fareEstimate.updateFareEstimate.method,
                url: summaryApi.fareEstimate.updateFareEstimate.url.replace(':id', id || ''),
                data: formData
            })
            toast.success('Fare Estimate Updated Successfully!')
            navigate("/fareestimate/view")
        } catch (error) {
            setError("Error updating fareestimate.")
            toast.warning('Fare Estimate Update Problem!')
        }
        formClear()
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this time table?')

        if (confirmDelete) {
            try {
                await axios({
                    method: summaryApi.fareEstimate.deleteFareEstimate.method,
                    url: summaryApi.timeTable.deleteTimeTable.url.replace(':id', id || '')
                })
                toast.success('Fare Estimate Deleted Successfully!')
                navigate("/fareestimate/view")
            } catch (error) {
                setError("Error deleting fare estimate.")
                toast.warning('Fare Estimate Delete Problem!')
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
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Fare Estimate</h1>

            <div className="mb-4">{fare && (
                <form className="bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto">
                    <div className="mb-2">
                        <TextBox
                            title={"Start Location"}
                            type={"text"}
                            placeholder={"Enter Start Location"}
                            name={"startLocation"}
                            value={formData.startStop}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-2">
                        <TextBox
                            title={"End Location"}
                            type={"text"}
                            placeholder={"Enter End Location"}
                            name={"endLocation"}
                            value={formData.endStop}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-2">
                        <TextBox
                            title={"Route Number"}
                            type={"text"}
                            placeholder={"Enter Route Number"}
                            name={"routeNumber"}
                            value={formData.routeNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-2">
                        <SelectBox
                            title="Bus Type"
                            name="busType"
                            options={["Normal", "Semi-Luxury", "Luxury"]}
                            value={formData.busType}
                            placeholder="Select Bus Type"
                            onChange={handleSelectChange}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="capitalize text-md font-medium text-gray-700">Ticket Price</label>
                        <input
                            type={"number"}
                            min={0}
                            placeholder="Enter Ticket Price"
                            name={"price"}
                            value={formData.estimatedFare.toString()}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-150 ease-in-out"
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

export default EditFareEstimate
