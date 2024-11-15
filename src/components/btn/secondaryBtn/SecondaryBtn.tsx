import SecondaryBtnType from "../../../types/btn/secondaryBtn/SecondaryBtnType"

const SecondaryBtn = (btn:SecondaryBtnType) => {
    return (
        <button onClick={btn.onClick} type={btn.type} className={`${btn.classes}`+" flex text-[11px] items-center border rounded-md px-2 py-1 transition"}>
            <span className="capitalize">{btn.title}</span>
            <span className="ml-2">&gt;</span>
        </button>
    )
}

export default SecondaryBtn