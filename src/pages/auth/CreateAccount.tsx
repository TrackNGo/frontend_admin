import { ChangeEvent, useState } from "react"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import SelectBox from "../../components/selectBox/SelectBox"
import TextBox from "../../components/textBox/TextBox"
import UserTypes from "../../types/user/UserTypes"

const CreateAccount = () => {
  const [error, setError] = useState<{ [key: string]: string }>({})
  const [formData, setFormData] = useState<UserTypes>({
    nic: '',
    username: '',
    firstName: '',
    lastName: '',
    mobile: '',
    password: '',
    accType: 'General',
  })
  const [confirmPassword, setConfirmPassword] = useState('') // New state for confirm password

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    setError((prev) => ({ ...prev, [name]: "" }))
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
    setError((prev) => ({ ...prev, confirmPassword: "" }))
  }

  const handleAccTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      accType: value
    }))
    setError((prev) => ({ ...prev, accType: "" }))
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const newError: { [key: string]: string } = {}

    if (!formData.nic) newError.nic = "NIC is required"
    if (!formData.username) newError.username = "Username is required"
    if (!formData.firstName) newError.firstName = "First Name is required"
    if (!formData.lastName) newError.lastName = "Last Name is required"
    if (!formData.mobile) newError.mobile = "Mobile number is required"
    if (!formData.password) newError.password = "Password is required"
    if (formData.password !== confirmPassword) newError.confirmPassword = "Passwords do not match" // Validation for confirm password

    if (Object.keys(newError).length > 0) {
      setError(newError)
    } else {
      setError({})
      const data = {
        nic: formData.nic,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile,
        password: formData.password,
        accType: formData.accType,
      }
      console.log("Creating account with data:", data)
      // backend connection here
    }
  }

  return (
    <div className="container mx-auto max-w-lg py-8 px-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create a New Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <TextBox
            title="NIC"
            name="nic"
            value={formData.nic}
            onChange={handleInputChange}
            placeholder="Enter NIC"
            type="text"
          />
          <div className={`text-sm capitalize ${error.nic ? "text-red-600" : "text-slate-400"}`}>
            {error.nic || "Required"}
          </div>
        </div>

        <div>
          <TextBox
            title="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter Username"
            type="text"
          />
          <div className={`text-sm capitalize ${error.username ? "text-red-600" : "text-slate-400"}`}>
            {error.username || "Required"}
          </div>
        </div>

        <div>
          <TextBox
            title="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter First Name"
            type="text"
          />
          <div className={`text-sm capitalize ${error.firstName ? "text-red-600" : "text-slate-400"}`}>
            {error.firstName || "Required"}
          </div>
        </div>

        <div>
          <TextBox
            title="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
            type="text"
          />
          <div className={`text-sm capitalize ${error.lastName ? "text-red-600" : "text-slate-400"}`}>
            {error.lastName || "Required"}
          </div>
        </div>

        <div>
          <TextBox
            title="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Enter Mobile"
            type="text"
          />
          <div className={`text-sm capitalize ${error.mobile ? "text-red-600" : "text-slate-400"}`}>
            {error.mobile || "Required"}
          </div>
        </div>

        <div>
          <SelectBox
            title="Account Type"
            name="accType"
            value={formData.accType}
            onChange={handleAccTypeChange}
            options={['General', 'Admin']}
            placeholder="Select Account Type"
          />
          <div className={`text-sm capitalize ${error.accType ? "text-red-600" : "text-slate-400"}`}>
            {error.accType || "Required"}
          </div>
        </div>

        <div>
          <TextBox
            title="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
            type="password"
          />
          <div className={`text-sm capitalize ${error.password ? "text-red-600" : "text-slate-400"}`}>
            {error.password || "Required"}
          </div>
        </div>

        <div>
          <TextBox
            title="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
            type="password"
          />
          <div className={`text-sm capitalize ${error.confirmPassword ? "text-red-600" : "text-slate-400"}`}>
            {error.confirmPassword || "Required"}
          </div>
        </div>

        <div className="mt-6">
          <PrimaryBtn
            title="Create Account"
            type="submit"
            onClick={handleSubmit}
            classes={"bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 border-solid border-1 border-blue-900 text-white"}
          />
        </div>
      </form>
    </div>
  )
}

export default CreateAccount
