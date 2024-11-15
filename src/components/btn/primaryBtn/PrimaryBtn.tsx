import PrimaryBtnType from "../../../types/btn/primaryBtn/PrimaryBtnType"

const PrimaryBtn = (btn:PrimaryBtnType) => {
    return (
        <>
            <button onClick={btn.onClick} type={btn.type} className={`${btn.classes} +" capitalize font-medium w-full border border-transparent active:scale-95 transition-all duration-200 ease-in-out rounded-md p-2 shadow-md hover:shadow-lg"`}>
                {btn.title}
            </button>
        </>
    )
}

export default PrimaryBtn