import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn"
import Headline from "../../components/headline/Headline"
import SelectBox from "../../components/selectBox/SelectBox"
import TextBox from "../../components/textBox/TextBox"

const ManageTimeTable = () => {
    return (
        /*
interface BusData{
    busRouteNumber:string,
    busType:string,
    price:number,
    startTime:Date,
    endTime:Date,
}
interface TimeTableType{
    startLocation:string,
    endLocation:string,
    bus:BusData[]
}
        */
        <div className="px-2">
            <Headline title={"Manage Time Table"} />
            <form className="py-2 pb-10">
                <div>
                    <div>
                        <TextBox title={"Start Location"} type={""} placeholder={""} name={""} />
                    </div>
                    <div>
                        <TextBox title={"End Location"} type={""} placeholder={""} name={""} />
                    </div>
                </div>
                <div>
                    <div>
                        <TextBox title={"Route Number"} type={""} placeholder={""} name={""} />
                    </div>
                    <div>

                        <div>
                            <SelectBox
                                title="Bus Type"
                                name="type"
                                options={["Normal", "Semi-Luxury", "Luxury"]}
                                placeholder="Select Bus Type"
                            />
                            {/*
                            <div className={`text-sm capitalize ${error.type ? "text-red-600" : "text-slate-400"}`}>
                                {error.type || "required"}
                            </div>
                             */}
                        </div>
                    </div>
                    <div>
                        <TextBox title={"Price"} type={""} placeholder={""} name={""} />
                    </div>
                </div>

                <div>
                    <div>
                        <TextBox title={"Start Time"} type={""} placeholder={""} name={""} />
                    </div>
                    <div>
                        <TextBox title={"End Time"} type={""} placeholder={""} name={""} />
                    </div>
                </div>
                <div className="mt-4">
                    <PrimaryBtn
                        title="Confirm"
                        type="submit"
                        classes="bg-blue-700 text-white border-transparent font-semibold rounded-md hover:bg-blue-800"
                    />
                </div>
            </form>

        </div>
    )
}

export default ManageTimeTable