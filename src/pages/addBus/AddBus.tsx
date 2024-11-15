import { useState, ChangeEvent, FormEvent } from "react"
import Headline from "../../components/headline/Headline"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import TextBox from "../../components/textBox/TextBox"
import busDetailsType from "../../types/busDetails/busDetailsTypes"

const AddBus = () => {
  const [busDetails, setBusDetails] = useState<busDetailsType>({
    busNumber: "",
    startLocation: "",
    endLocation: "",
    routeNumber: "",
    fareEstimate: "",
    type: "Normal",
    status: false,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setBusDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(busDetails)
  }

  return (
    <div className="px-2">
      <Headline title="Add Bus" />

      <div className="py-4 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextBox
            title="Bus Number"
            type="text"
            placeholder="Enter Bus Number"
            name="busNumber"
            onChange={handleChange}
            value={busDetails.busNumber}
          />

          <TextBox
            title="Start Location"
            type="text"
            placeholder="Enter Start Location"
            name="startLocation"
            onChange={handleChange}
            value={busDetails.startLocation}
          />

          <TextBox
            title="End Location"
            type="text"
            placeholder="Enter End Location"
            name="endLocation"
            onChange={handleChange}
            value={busDetails.endLocation}
          />

          <TextBox
            title="Route Number"
            type="text"
            placeholder="Enter Route Number"
            name="routeNumber"
            onChange={handleChange}
            value={busDetails.routeNumber}
          />

          <TextBox
            title="Fare Estimate"
            type="text"
            placeholder="Enter Fare Estimate"
            name="fareEstimate"
            onChange={handleChange}
            value={busDetails.fareEstimate}
          />

          <div>
            <label className="block font-medium mb-2">Bus Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Normal"
                  checked={busDetails.type === "Normal"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Normal
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Semi-Luxury"
                  checked={busDetails.type === "Semi-Luxury"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Semi-Luxury
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Luxury"
                  checked={busDetails.type === "Luxury"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Luxury
              </label>
            </div>
          </div>

          <PrimaryBtn
            title="Add Bus"
            onClick={handleSubmit}
            type="submit"
            classes="bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800"
          />
        </form>
      </div>
    </div>
  )
}

export default AddBus
