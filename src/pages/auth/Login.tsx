import { ChangeEvent, useState } from "react"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import TextBox from "../../components/textBox/TextBox"
import SelectBox from "../../components/selectBox/SelectBox"
import axios from "axios"
import summaryApi from "../../common/summaryApi"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { login } = useAuth()
  const [error, setError] = useState<{ credentialsUsername?: string; password?: string; accType?: string }>({})
  const [credentials, setCredentials] = useState<{ credentialsUsername: string; password: string; accType: string }>({
    credentialsUsername: "",
    password: "",
    accType: "Admin",
  })

  const navigate = useNavigate()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }))
    setError((prev) => ({ ...prev, [name]: "" }))
  }

  const clearForm=()=>{
    setCredentials({
      credentialsUsername: "",
      password: "",
      accType: "Admin",
    })
  }

  // const handleSelectChange = (value: string) => {
  //   setCredentials((prev) => ({
  //     ...prev,
  //     accType: value
  //   }))
  //   setError((prev) => ({ ...prev, accType: "" }))
  // }

  async function submit(event: any) {
    event.preventDefault()
    const newError: { credentialsUsername?: string; password?: string; accType?: string } = {}
  
    if (!credentials.credentialsUsername) {
      newError.credentialsUsername = "Username Required!"
    }
    if (!credentials.password) {
      newError.password = "Password Required!"
    }
  
    if (Object.keys(newError).length > 0) {
      setError(newError)
    } else {
      setError({})
      const data = {
        loginIdentifier: credentials.credentialsUsername, // Correct key
        password: credentials.password,                  // Correct key
        accType: credentials.accType,                    // Include accType if your backend handles it
      }
      console.log("Logging in with data:", data)
  
      try {
        const response = await axios.post(summaryApi.auth.login.url, data)
  
        if (response.status === 200) {
          console.log("Login Success")
          login(response.data) // Assuming `login` saves the token and user data
          navigate("/") // Redirect to dashboard
        } else {
          console.error("Unexpected response status:", response.status)
        }
        clearForm()
      } catch (err: any) {
        if (err.response) {
          console.error("Login failed:", err.response.data)
          setError({ credentialsUsername: "Invalid login details" }) // Display a generic error
        } else {
          console.error("Error during login:", err)
        }
      }
    }
  }

  return (
    <div className="container mx-auto mb-10 md:mt-5">
      <div className="flex items-center justify-center mb-6">
        <form className="md:border md:border-slate-200 rounded-xl max-w-[500px] min-w-[400px] center p-4 pb-8 pt-10 md:pt-6 md:shadow-lg">
          <div className="text-left md:text-center mb-8">
            <h1 className="capitalize text-3xl font-semibold mb-2">Login your account</h1>
          </div>

          <div>
            <TextBox
              onChange={handleInputChange}
              value={credentials.credentialsUsername}
              title={"Username"}
              type={"text"}
              placeholder={"Enter Admin Username"}
              name={"credentialsUsername"}
            />
            <div className={`text-sm capitalize ${error.credentialsUsername ? "text-red-600" : "text-slate-400"}`}>
              {error.credentialsUsername || "required"}
            </div>
          </div>

          {/* <div className="mt-2">
            <SelectBox
              title="Account Type"
              name="accType"
              value={credentials.accType}
              onChange={handleSelectChange}
              options={["Admin"]}
              placeholder="Select Account Type"
            />
            <div className={`text-sm capitalize ${error.accType ? "text-red-600" : "text-slate-400"}`}>
              {error.accType || "required"}
            </div>
          </div> */}

          <div className="mt-2">
            <TextBox
              onChange={handleInputChange}
              value={credentials.password}
              title={"Password"}
              type={"password"}
              placeholder={"Password"}
              name={"password"}
            />
            <div className={`text-sm capitalize ${error.password ? "text-red-600" : "text-slate-400"}`}>
              {error.password || "required"}
            </div>
          </div>

          <div className="mt-4">
            <PrimaryBtn
              type={"button"}
              onClick={submit}
              title={"Login"}
              classes={"bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 border-solid border-1 border-blue-900 text-white"}
            />
          </div>

          <div className="mt-3">
            <PrimaryBtn
              type={"button"}
              onClick={() => { console.log(credentials) }}
              title={"Forgot Password"}
              classes={'bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-black border-1 text-black'}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
