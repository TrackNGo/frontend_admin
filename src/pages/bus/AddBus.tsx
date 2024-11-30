import { useState, ChangeEvent, FormEvent } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Headline from "../../components/headline/Headline"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import TextBox from "../../components/textBox/TextBox"
import SelectBox from "../../components/selectBox/SelectBox"
import axios from "axios"
import summaryApi from "../../common/summaryApi"
import BusDetailsType from "../../types/busDetails/BusDetailsTypes"

const AddBus = () => {
  const [busDetails, setBusDetails] = useState<BusDetailsType>({
    busNumber: "",
    startLocation: "",
    endLocation: "",
    routeNumber: "",
    fareEstimate: "",
    type: "Normal",
    status: false,
  })

  const [error, setError] = useState<{ [key in keyof BusDetailsType]?: string }>({})

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setBusDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
    setError((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSelectChange = (value: string) => {
    setBusDetails((prev) => ({
      ...prev,
      type: value,
    }))
    setError((prev) => ({ ...prev, type: "" }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const newError: { [key in keyof BusDetailsType]?: string } = {}

    if (!busDetails.busNumber) newError.busNumber = "Bus Number Required!"
    if (!busDetails.startLocation) newError.startLocation = "Start Location Required!"
    if (!busDetails.endLocation) newError.endLocation = "End Location Required!"
    if (!busDetails.routeNumber) newError.routeNumber = "Route Number Required!"
    if (!busDetails.fareEstimate) newError.fareEstimate = "Fare Estimate Required!"

    if (Object.keys(newError).length > 0) {
      setError(newError)
    } else {
      setError({})
      //console.log("Bus Details Submitted:", busDetails)

      // backend connection for adding bus
      const response = await axios({
        method: summaryApi.bus.addBus.method,
        url: summaryApi.bus.addBus.url,
        data: busDetails,
      })

      console.log(response.data)

      if (response.status === 201) {
        console.log("bus added okk!")
        toast.success('Bus added successfully!')
        setBusDetails({
          busNumber: "",
          startLocation: "",
          endLocation: "",
          routeNumber: "",
          fareEstimate: "",
          type: "Normal",
          status: false,
        })
      } else {
        console.log("bus added problem!")
      }
    }
  }

  return (
    <div className="px-2">
      <Headline title="Add Bus" />

      <div className="py-4 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <TextBox
              title="Bus Number"
              type="text"
              placeholder="Enter Bus Number"
              name="busNumber"
              onChange={handleChange}
              value={busDetails.busNumber}
            />
            <div className={`text-sm capitalize ${error.busNumber ? "text-red-600" : "text-slate-400"}`}>
              {error.busNumber || "required"}
            </div>
          </div>

          <div>
            <TextBox
              title="Start Location"
              type="text"
              placeholder="Enter Start Location"
              name="startLocation"
              onChange={handleChange}
              value={busDetails.startLocation}
            />

            <div className={`text-sm capitalize ${error.startLocation ? "text-red-600" : "text-slate-400"}`}>
              {error.startLocation || "required"}
            </div>
          </div>

          <div>
            <TextBox
              title="End Location"
              type="text"
              placeholder="Enter End Location"
              name="endLocation"
              onChange={handleChange}
              value={busDetails.endLocation}
            />
            <div className={`text-sm capitalize ${error.endLocation ? "text-red-600" : "text-slate-400"}`}>
              {error.endLocation || "required"}
            </div>
          </div>

          <div>
            <TextBox
              title="Route Number"
              type="text"
              placeholder="Enter Route Number"
              name="routeNumber"
              onChange={handleChange}
              value={busDetails.routeNumber}
            />
            <div className={`text-sm capitalize ${error.routeNumber ? "text-red-600" : "text-slate-400"}`}>
              {error.routeNumber || "required"}
            </div>
          </div>

          <div>
            <TextBox
              title="Max Fare Estimate"
              type="text"
              placeholder="Enter Fare Estimate"
              name="fareEstimate"
              onChange={handleChange}
              value={busDetails.fareEstimate}
            />
            <div className={`text-sm capitalize ${error.fareEstimate ? "text-red-600" : "text-slate-400"}`}>
              {error.fareEstimate || "required"}
            </div>
          </div>

          <div>
            <div>
              <SelectBox
                title="Bus Type"
                name="type"
                value={busDetails.type}
                onChange={handleSelectChange}
                options={["Normal", "Semi-Luxury", "Luxury"]}
                placeholder="Select Bus Type"
              />
              <div className={`text-sm capitalize ${error.type ? "text-red-600" : "text-slate-400"}`}>
                {error.type || "required"}
              </div>
            </div>
          </div>

          <PrimaryBtn
            title="Add Bus"
            onClick={handleSubmit}
            type="submit"
            classes="bg-blue-700 text-white border-transparent font-semibold rounded-md hover:bg-blue-800"
          />
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  )
}

export default AddBus
