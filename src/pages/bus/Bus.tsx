import Headline from "../../components/headline/Headline"

const Bus = () => {
    return (
        <div>
            <Headline title={"Bus"} />
            <div>
                <div>View Buses</div>{/*front end ok backend connection ok */}
                <div>Add Bus</div>{/*front end ok backend connection ok */}
                <div>Update & Modify Bus Details</div>
                <div>Delete Bus</div>
                <div>Assign & Update Route for Buses</div>{/*front end ok*/}
            </div>
        </div>
    )
}

export default Bus
