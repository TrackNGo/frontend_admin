import { ChangeEvent, useState } from "react"
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import TextBox from "../../components/textBox/TextBox"

const Login = () => {
  const [error, setError] = useState<{ credentialsUsername?: string; password?: string }>({})
  const [credentials, setCredentials] = useState<{ credentialsUsername: string; password: string }>({
    credentialsUsername: "",
    password: ""
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }))
    setError((prev) => ({ ...prev, [name]: "" }))
  }
  async function submit(event: any) {
    event.preventDefault()
    const newError: { credentialsUsername?: string; password?: string } = {}

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
        credentialsUsername: credentials.credentialsUsername,
        password: credentials.password
      }
      console.log("Logging in with data:", data)
      //backend connection
    }
  }

  return (
    <div>
      <div className="container mx-auto mb-10 md:mt-5">
        <div className="flex items-center justify-center mb-6">
          <form className="md:border md:border-slate-200 rounded-xl max-w-[500px] min-w-[400px] center p-4 pb-8 pt-10 md:pt-6 md:shadow-lg">
            <div className="text-left md:text-center mb-8">
              <h1 className="capitalize text-3xl font-semibold mb-2">login your account</h1>
            </div>
            <div>
              <TextBox
                onChange={handleInputChange}
                value={credentials.credentialsUsername}
                title={"Username"}
                type={"text"}
                placeholder={"Username or Email or Mobile Number"}
                name={"credentialsUsername"}
              />
              <div className={`text-sm capitalize ${error.credentialsUsername ? "text-red-600" : "text-slate-400"}`}>
                {error.credentialsUsername || "required"}
              </div>
            </div>

            <div className="mt-2">
              <TextBox
                onChange={handleInputChange}
                value={credentials.password}
                title={"password"}
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
                title={"login"}
                classes={"bg-gradient-to-r from-black to-black hover:from-slate-800 hover:to-slate-700 border-solid border-1 border-slate-900 text-white"}
              />
            </div>

            <div className="mt-3">
              <PrimaryBtn
                type={"button"}
                onClick={() => { console.log(credentials) }}
                title={"forgot password"}
                classes={'bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
