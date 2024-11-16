import { useState, ChangeEvent } from "react";
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn";
import TextBox from "../../components/textBox/TextBox";

const ChangePassword = () => {
    const [error, setError] = useState<{ currentPassword?: string; newPassword?: string; confirmPassword?: string }>({})
    const [credentials, setCredentials] = useState<{ currentPassword: string; newPassword: string, confirmPassword: string }>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
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

        const newError: { currentPassword?: string; newPassword?: string; confirmPassword?: string } = {}

        if (!credentials.currentPassword) {
            newError.currentPassword = "Current Password Required!"
        }
        if (!credentials.newPassword) {
            newError.newPassword = "New Password Required!"
        }
        if (!credentials.confirmPassword) {
            newError.confirmPassword = "Confirm Password Required!"
        }

        if (credentials.newPassword && credentials.confirmPassword && credentials.newPassword !== credentials.confirmPassword) {
            newError.confirmPassword = "Password not match";
        }

        if (Object.keys(newError).length > 0) {
            setError(newError);
        } else {
            setError({});
            console.log("Password successfully changed:", credentials.newPassword);
            //backend connection
        }

    }

    return (
        <div>
            <div className="container mx-auto mb-10 md:mt-5">
                <div className="flex items-center justify-center mb-6">
                    <form className="md:border md:border-slate-200 rounded-xl max-w-[500px] min-w-[400px] center p-4 pb-8 pt-10 md:pt-6 md:shadow-lg">
                        <div className="text-left md:text-center mb-8">
                            <h1 className="capitalize text-3xl font-semibold mb-2">change your password</h1>
                        </div>

                        <div className="mt-2">
                            <TextBox
                                onChange={handleInputChange}
                                value={credentials.currentPassword}
                                title={"current password"} type={"password"}
                                placeholder={"Current Password"}
                                name={"currentPassword"}
                            />
                            <div className={`text-sm capitalize ${error.currentPassword ? "text-red-600" : "text-slate-400"}`}>
                                {error.currentPassword || "required"}
                            </div>
                        </div>

                        <div className="mt-2">
                            <TextBox onChange={handleInputChange}
                                value={credentials.newPassword}
                                title={"new password"}
                                type={"password"}
                                placeholder={"New Password"}
                                name={"newPassword"}
                            />
                            <div className={`text-sm capitalize ${error.newPassword ? "text-red-600" : "text-slate-400"}`}>
                                {error.newPassword || "required"}
                            </div>
                        </div>

                        <div className="mt-2">
                            <TextBox
                                onChange={handleInputChange}
                                value={credentials.confirmPassword}
                                title={"confirm password"}
                                type={"password"}
                                placeholder={"Confirm Password"}
                                name={"confirmPassword"}
                            />
                            <div className={`text-sm capitalize ${error.confirmPassword ? "text-red-600" : "text-slate-400"}`}>
                                {error.confirmPassword || "required"}
                            </div>
                        </div>

                        <div className="mt-4">
                            <PrimaryBtn
                                type={"button"}
                                onClick={submit}
                                title={"change password"}
                                classes={"bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 border-solid border-1 border-blue-900 text-white"}
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

                        <div className="mt-3">
                            <PrimaryBtn
                                type={"button"}
                                onClick={() => { console.log(credentials) }}
                                title={"cancel"}
                                classes={'bg-gradient-to-r from-white to-white hover:from-slate-100 hover:to-slate-200 border-solid border-1 border-slate-900 text-black'}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
