import { ChangeEvent, FormEvent, useState } from "react"
import Headline from "../../components/headline/Headline"
import FareDetailsType from "../../types/fareDetails/FareDetailsType"
import { toast, ToastContainer } from "react-toastify"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import TextBox from "../../components/textBox/TextBox"
import SelectBox from "../../components/selectBox/SelectBox"
import axios from "axios"
import summaryApi from "../../common/summaryApi"

const AddFareEstimates = () => {
  const [formData, setFormData] = useState<FareDetailsType>({
    busType: "",
    estimatedFare: "",
    startStop: "",
    endStop: "",
    routeNumber: ""
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
      busType: "",
      estimatedFare: "",
      startStop: "",
      endStop: "",
      routeNumber: ""
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const requestData = {
      routeNumber: formData.routeNumber,
      busType: formData.busType,  // Rename 'type' to 'busType'
      startStop: formData.startStop, // Rename 'startLocation' to 'startStop'
      endStop: formData.endStop, // Rename 'endLocation' to 'endStop'
      estimatedFare: Number(formData.estimatedFare) // Rename 'price' to 'estimatedFare' and ensure it's a number
    }

    try {
      const response = await axios.post(summaryApi.fareEstimate.createFareEstimate.url, requestData)
      console.log("Fare Estimate created successfully:", response.data)
      toast.success('Fare Estimate Added Successfully!')
    } catch (error: any) {
      console.error("Error creating fare estimate:", error)
      toast.warning('Fare Estimate Added Problem!')
    }
    formClear()
  }

  return (
    <div className='px-2'>
      <Headline title="Add Fare Estimate" />
      <div className="py-4 max-w-md mx-auto">
        <form className="py-2 pb-10" onSubmit={handleSubmit}>
          <div className="mb-2">
            <TextBox
              title={"Start Location"}
              type={"text"}
              placeholder={"Enter Start Location"}
              name={"startStop"}
              value={formData.startStop}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <TextBox
              title={"End Location"}
              type={"text"}
              placeholder={"Enter End Location"}
              name={"endStop"}
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
              name={"estimatedFare"}
              value={formData.estimatedFare.toString()}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition duration-150 ease-in-out"
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

export default AddFareEstimates
