import { useState, ChangeEvent, FormEvent } from "react"
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import Headline from "../../components/headline/Headline"
import SelectBox from "../../components/selectBox/SelectBox"
import TextBox from "../../components/textBox/TextBox"
import TimeTableType from "../../types/timeTable/TimeTableType"
import summaryApi from "../../common/summaryApi"

const ManageTimeTable = () => {
    const [formData, setFormData] = useState<TimeTableType>({
        startLocation: "",
        endLocation: "",
        busRouteNumber: "",
        busType: "Normal", // Default value for bus type
        price: 0,
        startTime: "",
        endTime: "",
    })

    // Handle input changes and update the state
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            busType: value,
        }))
    }


    const formClear = () => {
        setFormData({
            startLocation: '',
            endLocation: '',
            busRouteNumber: '',
            busType: 'Normal',
            price: 0,
            startTime: '',
            endTime: ''
        })
    }

    // Handle form submission
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        console.log(formData) // This is where the form data will be available
        // You can send formData to an API or perform other actions here
        try {
            const response = await axios.post(summaryApi.timeTable.createTimeTable.url, formData)
            console.log("Time Table created successfully:", response.data)
            toast.success('Time Table Added Successfully!')
        } catch (error: any) {
            console.error("Error creating time table:", error)
            toast.warning('Time Table Added Problem!')
        }
        formClear()
    }

    return (
        <div className="px-2">
            <Headline title={"Manage Time Table"} />
            <div className="py-4 max-w-md mx-auto">
                <form className="py-2 pb-10" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <TextBox
                            title={"Start Location"}
                            type={"text"}
                            placeholder={"Enter Start Location"}
                            name={"startLocation"}
                            value={formData.startLocation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <TextBox
                            title={"End Location"}
                            type={"text"}
                            placeholder={"Enter End Location"}
                            name={"endLocation"}
                            value={formData.endLocation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <TextBox
                            title={"Route Number"}
                            type={"text"}
                            placeholder={"Enter Route Number"}
                            name={"busRouteNumber"}
                            value={formData.busRouteNumber}
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
                        <TextBox
                            title={"Ticket Price"}
                            type={"number"}
                            placeholder={"Enter Ticket Price"}
                            name={"price"}
                            value={formData.price.toString()}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <TextBox
                            title={"Start Time"}
                            type={"time"}
                            name={"startTime"}
                            value={formData.startTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <TextBox
                            title={"End Time"}
                            type={"time"}
                            name={"endTime"}
                            value={formData.endTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4">
                        <PrimaryBtn
                            title="Confirm"
                            type="submit"
                            classes="bg-blue-700 text-white border-transparent font-semibold rounded-md hover:bg-blue-800"
                        />
                    </div>
                </form>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            </div>
        </div>
    )
}

export default ManageTimeTable
